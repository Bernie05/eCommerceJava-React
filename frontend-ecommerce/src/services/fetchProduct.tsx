import axios from "axios";

const api = "http://localhost:5454/products"; // Backend API URL

export const fetchProduct = async() => {
    try {
        const response = await axios.get(api);

        console.log('fetchProduct response:', response);
        return response.data;
    } catch(error) {
        console.error("Error fetching product:", error);
    }
}