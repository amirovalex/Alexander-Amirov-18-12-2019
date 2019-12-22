export const handleErrors = (response) => {
	if (!response.ok) {
		return Promise.reject(response.statusText);
	}
	return response;
} 

export default handleErrors;