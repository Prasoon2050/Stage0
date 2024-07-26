import React from 'react'

function ReviewDetail({
    params,
}: {
    params: {
    productId: string;
    reviewId: string;
    };
}) {
  return (
    <div>Review {params.reviewId} for the product of {params.productId}</div>
  )
}

export default ReviewDetail