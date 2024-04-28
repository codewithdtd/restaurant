const MenuService = require("../services/menu.service");
const CategoryService = require("../services/category.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error")

exports.create = async (req, res, next) => {
    try {
        const menuService = new MenuService(MongoDB.client);
        const { name, category, price, quanlity, description } = req.body;
        const newProduct = {
            name: name,
            category: category,
            price: price,
            quanlity: quanlity,
            description: description,
            image: req.file.filename,
        };
        const document = await menuService.create(newProduct);
        return res.send(document);
    } catch (error) { 
        return next(
            new ApiError(500, "Đã có lỗi xảy ra trong quá trình tạo sản phẩm") 
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const menuService = new MenuService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await menuService.findByName(name);
        } else {
            documents = await menuService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving menus")
        ); 
    }
    return res.send(documents);
};

// Find a sigle menu with an id
exports.findOne = async (req, res, next) => {
    try {
        const menuService = new MenuService(MongoDB.client);
        const document = await menuService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "menu not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving menu with id=${req.params.id}`
            )
        );
    }
};


// Update a menu by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const menuService = new MenuService(MongoDB.client);
        if(req.file != null) req.body.image = req.file.filename;
        const document = await menuService.update(req.body._id, req.body);
        if (!document) {
            return next(new ApiError(404, "menu not found"));
        }
        return res.send({ message: "menu was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving menu with id=${req.body._id}`)
        );
    }
}


// Delete a menu with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const menuService = new MenuService(MongoDB.client);
        const document = await menuService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "menu not found"));
        }
        return res.send({ message: "menu was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500, 
                `Could not delete menu with id=${req.params.id}`
            )
        );
    }
}


exports.findOneCategory = async (_req, res, next) => {
    try {
        const menuService = new MenuService(MongoDB.client);
        const categoryService = new CategoryService(MongoDB.client);
        const categoryName = await categoryService.findById(_req.params.id)
        const documents = await menuService.findByCategoryName(categoryName.name);
        return res.send(documents);
    } catch (error) {
        return next (
            new ApiError(
                500, "An error while retrieving favorite menus"
            )
        )
    }
}


exports.deleteAll = async (_req, res, next) => {
    try {
        const menuService = new MenuService(MongoDB.client);
        const deletedCount = await menuService.deleteAll();
        return res.send({
            message: `${deletedCount} menus were delete successfully`,
        })
    } catch (error) {
        return next (
            new ApiError(
                500, "An error while retrieving favorite menus"
            )
        )
    }
}

// CATEGORY
exports.createCategory = async (req, res, next) => {
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.create(req.body);
        return res.send(document);
    } catch (error) { 
        return next(
            new ApiError(500, "Đã có lỗi xảy ra trong quá trình thêm danh mục") 
        );
    }
};

exports.findAllCategory = async (req, res, next) => {
    let documents = [];

    try {
        const categoryService = new CategoryService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await categoryService.findByName(name);
        } else {
            documents = await categoryService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving categorys")
        ); 
    }
    return res.send(documents);
};

// Find a sigle category with an id
// exports.findOneCategory = async (req, res, next) => {
//     try {
//         const categoryService = new CategoryService(MongoDB.client);
//         const document = await categoryService.findById(req.params.id);
//         if (!document) {
//             return next(new ApiError(404, "category not found"));
//         }
//         return res.send(document);
//     } catch (error) {
//         return next(
//             new ApiError(
//                 500,
//                 `Error retrieving category with id=${req.params.id}`
//             )
//         );
//     }
// };


// Update a category by the id in the request
exports.updateCategory = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const categoryService = new CategoryService(MongoDB.client);
        const menuService = new MenuService(MongoDB.client);

        const document = await categoryService.update(req.params.id, req.body);
        
        if (!document) {
            return next(new ApiError(404, "category not found"));
        }
        const updateProductCategory = await menuService.updateProductCategory(document.name, req.body)
        
        return res.send(updateProductCategory);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving category with id=${req.params.id}`)
        );
    }
}


// Delete a category with the specified id in the request
exports.deleteCategory = async (req, res, next) => {
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const menuService = new MenuService(MongoDB.client);

        const category = await categoryService.findById(req.body.id)
        const products = await menuService.findByCategoryName(category.name);

        // const document = await categoryService.delete(req.params.id);
        if (products.length > 0) {
            return next(new ApiError(401, "Không thể xóa"));
        }

        const document = await categoryService.delete(req.body.id);
        if(!document) {
            return next(new ApiError(404, "Not Found!!!"));
        }
        return res.send({ message: "category was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500, 
                `Could not delete category with id=${req.body.id}`
            )
        );
    }
}


exports.findAllFavoriteCategory = async (_req, res, next) => {
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const documents = await categoryService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next (
            new ApiError(
                500, "An error while retrieving favorite categorys"
            )
        )
    }
}


exports.deleteAllCategory = async (_req, res, next) => {
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const deletedCount = await categoryService.deleteAll();
        return res.send({
            message: `${deletedCount} categorys were delete successfully`,
        })
    } catch (error) {
        return next (
            new ApiError(
                500, "An error while retrieving favorite categorys"
            )
        )
    }
}
