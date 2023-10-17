import{ Request, Response } from 'express';
export async function geoapify(req: Request, res: Response) {
  const query = req.body.query;
  const URI = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
    query
  )}&format=json&type=city&apiKey=${process.env.GEOAPIFY_API_KEY}}`

  const request = await fetch(URI, {
    'method': 'GET',
  });
  const response = await request.json();

  if (response.results && response.results.length > 0) {
    const formattedResults = response.results
      .map((results: Result) => ({
        city: results.city,
        stateId: results.state_code,
      }));
    res.json({
      success: true,
      data: formattedResults,
    });
  } else {
    res.json({
      success: false,
      message: "No results found",
    });
  }
}


type Result = {
  city: string;
  state_code: string;
  country_code: string;
};
