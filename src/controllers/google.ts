import { Request, Response } from 'express';
import { type } from 'os';
export async function getLocationGoogle(req:Request, res: Response) {
  const { query } = req.body;
  const URI = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    query
  )}&types=(cities)&key=${process.env.GOOGLE_PLACES_API_KEY}`;

  const request = await fetch(URI, {
    'method': 'GET',
  });

  const response = await request.json();

  if(response.predictions.length > 0) {
    
    const formattedResults = response.predictions.map((results: Results) => ({
      location: results?.description,
      city: results?.structured_formatting.main_text,
      stateID: results?.terms[1].value,
      countryCode: results?.terms[2]?.value,
    }))
    res.json({
      success: true,
      data: formattedResults
    });
  } else {
    res.json({
      success: false,
      message: "No results found",
    });
  }

};

type Results = {
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;

  }
  stateID: string;
  terms: [
    {
      value: string;
    },
    {
      value: string;
    },
    {
      value: string;
    }
  ]
}