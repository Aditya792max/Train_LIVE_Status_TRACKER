const BASE_URL = 'https://api.railradar.in/v1/trains';

exports.getCoachDetails = async (req, res, next) => {
    try {
        const { number, station } = req.params;

        // Validate train number
        if (!/^\d{5}$/.test(number)) {
            return res.status(400).json({
                message: 'Enter a valid 5-digit train number.'
            });
        }

        // Validate station code
        if (!/^[a-zA-Z0-9]{2,10}$/.test(station)) {
            return res.status(400).json({
                message: 'Enter a valid station code.'
            });
        }

        // Check API key
        if (!process.env.RAILRADAR_API_KEY) {
            return res.status(503).json({
                message: 'RailRadar API key is not configured.'
            });
        }

        // Construct API URL
        const url = `${BASE_URL}/${number}/coaches/${encodeURIComponent(station)}`;

        // Fetch coach details
        const apiResponse = await fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.RAILRADAR_API_KEY,
                Accept: 'application/json'
            },
            signal: AbortSignal.timeout(15000)
        });

        // Parse API response
        const data = await apiResponse.json();
        console.log('RailRadar API response:', data);
        // Return response to client
        return res.status(apiResponse.status).json(data);

    } catch (error) {
        if (
            error.name === 'TimeoutError' ||
            error.name === 'AbortError'
        ) {
            return res.status(504).json({
                message: 'RailRadar API request timed out.'
            });
        }

        return next(error);
    }
};