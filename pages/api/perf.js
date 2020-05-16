export default async (req, res) => {
  if (req.method === "POST") {
    const preparedVariables = {
      id: req.body.id,
      name: req.body.name,
      duration: req.body.value,
      startTime: req.body.startTime || null,
      source: req.body.label,
      tags: ["test"],
    };

    const response = await fetch("https://graphql.fauna.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FAUNADB_SERVER_KEY}`,
      },
      body: JSON.stringify({
        query: `mutation ($id:ID!,$name:String!, $duration: Int!, $startTime:Int, $source: String!, $tags:[String!]!) {
            createMetric(data: {id: $id, name: $name, duration:$duration , source:$source , tags:$tags, startTime:$startTime }) {
                id
            }
        }`,
        variables: preparedVariables,
      }),
    });
    const json = await response.json();
    res.json(json);
  }
  if (req.method === "GET") {
    const response = await fetch("https://graphql.fauna.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FAUNADB_SERVER_KEY}`,
      },
      body: JSON.stringify({
        query: `query{
            allMetrics{
              data{
                id
                name
                source
                duration
                startTime
                tags
              }
            }
          }`,
      }),
    });
    const json = await response.json();
    res.json(json);
  }
};
