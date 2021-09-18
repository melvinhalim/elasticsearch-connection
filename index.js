require("dotenv").config();
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: process.env.ELASTICSEARCH_NODE,
});

//aku buat index "usernames" untuk kebutuhan CRUD

//GET
//ID must, kalau udah ada ID querynya salahpun tetep GET data sesuai id
const getElasticSearch = (index, id /*query*/) => {
  async function run() {
    const { body } = await client.get({
      index,
      id,
      // body: {
      //   query,
      // },
    });
    console.log(body);
  }
  run().catch(console.log);
};

getElasticSearch(
  "usernames",
  "1"
  //,{ match: { username: "melvin0022" },}
);

// DELETE
const deleteElasticSearch = (index, id) => {
  client.delete({
    index,
    id,
  });
};

deleteElasticSearch("usernames", "oQLS93sBjYoXekWtIYid");

// UPDATE (bisa ubah data, bisa nambahin body)
const updateElasticSearch = (index, id, doc) => {
  async function run() {
    await client.update({
      index,
      id,
      body: {
        doc,
      },
    });
    const { body } = await client.get({
      index,
      id,
    });

    console.log(body);
  }
  run().catch(console.log);
};

updateElasticSearch("usernames", "1", {
  alamat: "alamat terupdate huehue",
});

// INSERT
const insertElasticSearch = (index, doc) => {
  client.index({
    index,
    body: {
      doc,
    },
  });
};

insertElasticSearch("usernames", { usernames: "tests" });

//COBAIN BUAT INDEX
// client.indices.create({
//   index: "testbuatindex",
// });

//COBAIN DELETE INDEX
// async function run() {
//   client.indices.delete({
//     index: "testbuatindex",
//   });
//   console.log("done");
// }
// run().catch(console.log);
