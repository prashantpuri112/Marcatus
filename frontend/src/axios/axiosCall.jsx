import axios from "axios"
import { toast } from "react-toastify"

export default async function axiosCall(url, body) {
    const baseUrl = 'http://localhost:8080'
    url = baseUrl + url
    try {
        const res = await axios.post(url, body)
        if (res.status === 200) {
            return res.data
        } else {
            toast.success(res.data.error, { positiom: toast.POSITION.TOP_RIGHT })
        }
    } catch (err) {
        console.log(err)
        toast.error(err.response.data.error, { positiom: toast.POSITION.TOP_RIGHT })
    }
}