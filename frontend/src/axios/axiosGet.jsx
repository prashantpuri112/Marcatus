import axios from "axios"
import { toast } from "react-toastify"

export default async function axiosGet(url) {
    const baseUrl = 'http://localhost:8080'
    url = baseUrl + url
    try {
        const res = await axios.get(url)
        if (res.status === 200) {
            toast.success(res.data.msg, { positiom: toast.POSITION.TOP_RIGHT })
            return res.data
        } else {
            toast.success(res.data.error, { positiom: toast.POSITION.TOP_RIGHT })
        }
    } catch (err) {
        console.log(err)
        toast.error(err.response.data.error, { positiom: toast.POSITION.TOP_RIGHT })
    }
}