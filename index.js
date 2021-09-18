require("dotenv").config();
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: process.env.ELASTICSEARCH_NODE,
});

//aku buat index "usernames" untuk kebutuhan CRUD

// GET;
const getElasticSearch = (index, query) => {
  async function run() {
    const { body } = await client.search({
      index,
      body: {
        query,
      },
    });
    console.log(body);
  }
  run().catch(console.log);
};

getElasticSearch("usernames", { match: { username: "melvin00223" } });

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
  match: { alamat: "alamat terupdate huehue" },
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

updateElasticSearch("usernames", "oALE93sBjYoXekWt5YjZ", {
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
client.indices.create({
  index: "testbuatindex",
});

//COBAIN DELETE INDEX
async function run() {
  client.indices.delete({
    index: "testbuatindex",
  });
  console.log("done");
}
run().catch(console.log);
