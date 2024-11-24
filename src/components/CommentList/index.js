import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const CommentList = ({ reviews, brandName }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="comment-list">
            <h1 className="brand-name">{`${brandName} Reviews`}</h1>

            {reviews.length === 0 ? (
                <div className="no-reviews-container">
                    <span className="no-reviews-label">No comment</span>
                    <p className="no-reviews-text">Empty</p>
                </div>
            ) : (
                reviews.map((review, index) => (
                    <div key={index} className="comment-item">
                        <div className="comment-author">
                            <img
                                src={review.review_author_photo}
                                alt="Author"
                                className="author-photo"
                            />
                            <div className="author-details">
                                <span className="author-name">{review.review_author}</span>
                                <span className="review-date">{formatDate(review.review_datetime_utc)}</span>
                            </div>
                        </div>
                        <div className="review-rating">
                            <span className="rating-text">Rating: {review.rating}/5</span>
                        </div>
                        <div className="review-text">
                            <p>{review.review_text}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

CommentList.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            review_text: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            review_author: PropTypes.string.isRequired,
            review_author_photo: PropTypes.string.isRequired,
            review_datetime_utc: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CommentList;
