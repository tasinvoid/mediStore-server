export const paginationHelper = (req) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 2;
    const skip = (page - 1) * limit;
    const sortOrder = typeof req.query.sortOrder === 'string' ? req.query.sortOrder : "asc";
    const sortBy = typeof req.query.sortBy === 'string' ? req.query.sortBy : "createdAt";
    return { page, limit, skip, sortBy, sortOrder };
};
//# sourceMappingURL=paginationhelper.js.map