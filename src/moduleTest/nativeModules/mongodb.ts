import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);


export async function mongoRun() {
    try {
        await client.connect();

        const db = client.db("dreamOrm");
        console.log("connected");

        const test = await db.collection("test").findOne({title: 'titl4'});

        // const cursor = test.aggregate([
        //     {
        //         $match: {
        //             "date": { $gte: new Date("2022-02-01"), $lt: new Date() }
        //         }
        //     },
        //     {
        //         $sort: { field3: 1 }
        //     }
        // ]);

        // await cursor.forEach(res => console.log(res))

        const cursor = test.find({ });

        await cursor.forEach(res => console.log(res));

        // await test.insertMany([
        //     {
        //         field1: "nice",
        //         field2: 69,
        //         field3: 4.20,
        //         date: new Date()
        //     },
        //     {
        //         field1: "missing field2",
        //         field3: 6.9,
        //         date: new Date()
        //     }
        // ]);

        // console.log(result.toArray());

        // await test.updateOne({ field1: "missing field2" }, {
        //     $set: { field2: "hi" }
        // })

    } finally {
        await client.close();
    }
}

// run().catch(err => console.error(err));