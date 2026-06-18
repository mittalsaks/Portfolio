// Generic CRUD controller factory.
// Used for Project, Hackathon, ResearchPaper, Skill, Experience —
// they all need the same getAll / getOne / create / update / delete shape.

const createCRUDController = (Model, defaultSort = { order: 1, createdAt: -1 }) => {
  // @access  Public
  const getAll = async (req, res, next) => {
    try {
      const items = await Model.find().sort(defaultSort);
      res.json({ success: true, count: items.length, data: items });
    } catch (error) {
      next(error);
    }
  };

  // @access  Public
  const getOne = async (req, res, next) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, message: "Item not found" });
      }
      res.json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  };

  // @access  Private (admin only)
  const create = async (req, res, next) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  };

  // @access  Private (admin only)
  const update = async (req, res, next) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) {
        return res.status(404).json({ success: false, message: "Item not found" });
      }
      res.json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  };

  // @access  Private (admin only)
  const remove = async (req, res, next) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, message: "Item not found" });
      }
      res.json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  return { getAll, getOne, create, update, remove };
};

module.exports = createCRUDController;
