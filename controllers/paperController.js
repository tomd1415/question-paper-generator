// controllers/paperController.js

exports.viewPaper = async (req, res) => {
  try {
    const { paperId } = req.params;

    // Fetch the paper and associated questions
    const paper = await db.Paper.findOne({
      where: { id: paperId },
      include: [
        {
          model: db.Question,
          as: 'questions',
        },
      ],
    });

    if (!paper) {
      return res.status(404).send('Paper not found.');
    }

    res.render('viewpaper', { paper });
  } catch (error) {
    console.error('Error fetching paper:', error);
    res.status(500).send('Server error.');
  }
};