import Amadeus from 'amadeus';

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

export async function POST(req) {
    const { tripType, fromLocation, toLocation, departureDate, returnDate, passengers } = await req.json();

    try {
        // Test Amadeus authentication before proceeding
        const authCheck = await amadeus.client.get('/v1/security/oauth2/token');
        if (authCheck.status !== 200) {
            return new Response(JSON.stringify({ error: 'Failed to authenticate with Amadeus' }), { status: 500 });
        }

        // Proceed with the flight search
        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: fromLocation,
            destinationLocationCode: toLocation,
            departureDate,
            ...(tripType === 'round-trip' && { returnDate }),
            adults: passengers,
            travelClass: 'ECONOMY',
        });

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error('Amadeus API error:', error.response?.result || error.message);
        return new Response(JSON.stringify({ error: 'Failed to fetch flights' }), { status: 500 });
    }
}
