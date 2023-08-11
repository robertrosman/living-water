import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { Settings } from "../schemas/settings";

const tables = {
    settings: "living-water-settings",
}

const marshallOptions = {
    removeUndefinedValues: true
};
  
const unmarshallOptions = {};

const translateConfig = { marshallOptions, unmarshallOptions };

const client = new DynamoDBClient({
    endpoint: 'http://localhost:8000'
});

const dynamo = DynamoDBDocumentClient.from(client, translateConfig);

//
// Settings
// 

export async function getSettings() {
    const result = await getItems(tables.settings);
    return result.Items
}

export async function getSettingsById(id: Settings['id']) {
    const result = await getItem(tables.settings, id);
    return result.Item
}

export async function editSettings(settings: Settings) {
    await upsertItem(tables.settings, settings);
    return `Upserted settings ${settings.id}`;
}

export async function deleteSettings(id: Settings['id']) {
    await deleteItem(tables.settings, id);
    return `Deleted settings for ${id}`;
}

//
// CRUD FUNCTIONS
// 

async function getItems(table: string) {
    return await dynamo.send(
        new ScanCommand({ 
            TableName: table,
        })
    );
}

async function getItem(table: string, id: string) {
    return await dynamo.send(
        new GetCommand({
            TableName: table,
            Key: {
                id
            }
        })
    );
}

async function upsertItem(table: string, settings: Record<string, any>) {
    return await dynamo.send(
        new PutCommand({
            TableName: table,
            Item: settings
        })
    );
}

async function deleteItem(table: string, id: string) {
    return await dynamo.send(
        new DeleteCommand({
            TableName: table,
            Key: {
                id
            }
        })
    );
}

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
