import PropTypes from 'prop-types';

function ProductCard({ item }) {
    const { image_url, make, model, specs } = item || {};

    return (
        <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-bold mb-4">Giveaway Date</h2>
            <p className="text-gray-300 mb-6">July 15, 2024</p>
            <h2 className="text-xl font-bold mb-4">{make + ' ' + model}</h2>
            <img src={image_url} alt={`${make} ${model}`} className="w-full rounded-lg mb-4" />
            <div className="text-gray-300">
                <p><span className="font-bold">RAM:</span> {specs?.RAM || 'N/A'}</p>
                <p><span className="font-bold">Display:</span> {specs?.display || 'N/A'}</p>
                <p><span className="font-bold">Processor:</span> {specs?.processor || 'N/A'}</p>
                <p><span className="font-bold">Storage:</span> {specs?.storage || 'N/A'}</p>
            </div>
        </div>
    );
}

// Define PropTypes for the component
ProductCard.propTypes = {
    item: PropTypes.shape({
        image_url: PropTypes.string.isRequired,
        make: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        specs: PropTypes.shape({
            RAM: PropTypes.string,
            display: PropTypes.string,
            processor: PropTypes.string,
            storage: PropTypes.string
        })
    }).isRequired
};

export default ProductCard;
