import LoginHelper from "@/utils/LoginHelper.js";

export default {
    handleResponse (response) {
        if (response.ok) {
            return response.json();
        } else {
			let message = `${response.status} - ${response.statusText}`;
            if (response.status === 401) {
				LoginHelper.logout();
				throw new Error(message);
            }
            return response.json().then(json => {
                message = json.errorMessage;
                throw new Error(message);
            }).catch(() => {
                throw new Error(message);
            });
        }
    }
};