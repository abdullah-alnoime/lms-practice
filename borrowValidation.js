async function validateBorrowLimits(memberId, bookId, BorrowModel) {
    
    // 1. Check if the book is already borrowed by this member
    const isAlreadyBorrowed = await BorrowModel.findOne({
        memberId: memberId,
        bookId: bookId,
        status: 'borrowed'
    });

    if (isAlreadyBorrowed) {
        return false; 
    }

    // 2. Check if the member already has 5 borrowed books
    const activeBorrowsCount = await BorrowModel.countDocuments({
        memberId: memberId,
        status: 'borrowed'
    });

    if (activeBorrowsCount >= 5) {
        return false; 
    }

    // If everything is okay, return true
    return true;
}

module.exports = { validateBorrowLimits };
