// GET /api/fellows
export const getFellows = async () => {
  try {
    const response = await fetch('/api/fellows');
    if (!response.ok) throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

/* 
The fetch helpers below are copies of the one above. The URL is wrong
and the config object is missing. Complete them!
*/

// POST /api/fellows
// TODO: Send a POST request to /api/fellows { fellowName } in the body
export const createFellow = async (fellowName) => {
  try {
    const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ fellowName }),
    };
    const response = await fetch('/api/fellows', config);
    if (!response.ok) throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// PATCH /api/fellows/:id
// TODO: Send a PATCH request to /api/fellows/:id with { fellowName } in the body
export const updateFellow = async (id, fellowName) => {
  try {
    const response = await fetch('/api/fellows');
    if (!response.ok) throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// DELETE /api/fellows/:id
// TODO: Send a DELETE request to /api/fellows/:id
export const deleteFellow = async (id) => {
  try {
    const response = await fetch('/api/fellows');
    if (!response.ok) throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
