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

export const createFellow = async (fellowName) => {
  try {
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

export const updateFellow = async (id, fellowName) => {
  try {
    const config = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fellowName }),
    };
    const response = await fetch(`/api/fellows/${id}`, config);
    if (!response.ok) throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const deleteFellow = async (id) => {
  try {
    const config = { method: 'DELETE' };
    const response = await fetch(`/api/fellows/${id}`, config);
    if (!response.ok) throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    return { data: true, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
