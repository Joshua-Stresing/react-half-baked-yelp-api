const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

const handler = async (event) => {
  const { zip, search } = event.queryStringParameters;
  // console.log({ zip, search });
  // add code here to fetch data from yelp API
  try {
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?location=${zip}&term=${search}`,
      { headers: {
        Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
      },
      }
    );
    const data = await response.json();
    const json = JSON.stringify(data);

    return {
      statusCode: 200,
      body: json,
    };

  } catch (error) {
    return {
      statusCode: 500,
      body:JSON.stringify({ error: 'Failed fetching data' })
    };
  }
  // be sure to include the parameters from event.queryStringParameters
};

module.exports = { handler };