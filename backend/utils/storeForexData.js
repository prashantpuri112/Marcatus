import forexModel from "../model/ForexModel.js";

export default function storeForexData() {
    try {
        fetch('https://www.nrb.org.np/api/forex/v1/rate')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Request failed');
                }
                return res.json()
            }).catch(err => {
                console.log(err)
            })
            .then((data) => {
                forexModel.deleteMany({}).then(res => {
                    const forexData = new forexModel(data.data.payload)
                    forexData.save()
                })
            }).catch(err => {
                console.log(err)
            })
    } catch (err) {
        console.log(err)
    }
}