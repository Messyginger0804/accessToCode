import React from 'react';

const pic = 'data:image/jpeg;base64,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'

function ProductCard() {
    return (
        <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-bold mb-4">Giveaway Date</h2>
            <p className="text-gray-300 mb-6">June 9, 2024</p>
            <h2 className="text-xl font-bold mb-4">Computer</h2>
            <img src={pic} alt="Computer" className="w-full rounded-lg mb-4" />
            <p className="text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit justo non tellus commodo, sit amet faucibus sem facilisis. Integer vel diam nunc. Sed nec leo nec eros rutrum ultricies ut non orci.</p>
        </div>
    );
}

export default ProductCard;
