const notFound = (req, res) => {
    res.status(404).json({
        message: "page not found",
        path: req.path,
        date: Date()
    });
};
export default notFound;
//# sourceMappingURL=notFound.js.map