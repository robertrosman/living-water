import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const tables = {
    settings: "living-water-settings",
    stats: "living-water-stats"
}

const client = new DynamoDBClient({
    endpoint: 'http://localhost:8000'
});

const dynamo = DynamoDBDocumentClient.from(client);

export async function seed() {
    return Promise.all(Object.values(tables).map(async table => {
        const r = await dynamo.send(new CreateTableCommand({
            TableName: table,
            KeySchema: [       
                { AttributeName: "id", KeyType: "HASH"}    //Partition key
            ],
            AttributeDefinitions: [       
                { AttributeName: "id", AttributeType: "S" }
            ],
            ProvisionedThroughput: {       
                ReadCapacityUnits: 10, 
                WriteCapacityUnits: 100
            }
        }))
    }))
}
