require("dotenv").config();
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: process.env.ELASTICSEARCH_NODE,
});

//index "usernames" untuk kebutuhan CRUD nanti didelete kalau udah sesuai

//GET
const getElasticSearch = (index, query) => {
  async function run() {
    const { body } = await client.search({
      index,
      body: {
        query,
      },
    });
    console.log(body.hits.hits);
  }
  run().catch(console.log);
};

getElasticSearch("usernames", { match: { username: "test1235" } });

// DELETE
const deleteElasticSearch = (index, query) => {
  async function run() {
    client.deleteByQuery({
      index,
      body: {
        query,
      },
    });
    console.log("Elastic Search Data Succesfully Removed");
  }
  run().catch(console.log);
};

deleteElasticSearch("usernames", {
  match: { username: "alamat update test" },
});

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

updateElasticSearch("usernames", "1ALqAHwBjYoXekWtP4j4", {
  alamat: "alamat update test",
});

// INSERT;
const insertElasticSearch = (index, body) => {
  client.index({
    index,
    body,
  });
};

insertElasticSearch("usernames", { username: "test1235" });
