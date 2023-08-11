import { CreateTableCommand, DeleteTableCommand, DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { Settings, settingsSchema } from "../schemas/settings";

const tables = {
    settings: "living-water-settings"
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

export async function getSettings() {
    const allSettings = await dynamo.send(
        new ScanCommand({ TableName: tables.settings })
    );
    return allSettings.Items
}

export async function getSettingsById(id: Settings['id']) {
    settingsSchema.shape.id.parse(id)
    const settings = await dynamo.send(
        new GetCommand({
            TableName: tables.settings,
            Key: {
                id
            }
        })
    );
    return settings.Item
}

export async function editSettings(settings: Settings) {
    settingsSchema.parse(settings)
    await dynamo.send(
        new PutCommand({
            TableName: tables.settings,
            Item: settings
        })
    );
    return `Put settings ${settings.id}`;
}

export async function deleteSettings(id: Settings['id']) {
    settingsSchema.shape.id.parse(id)
    await dynamo.send(
        new DeleteCommand({
            TableName: tables.settings,
            Key: {
                id
            }
        })
    );
    return `Deleted settings for ${id}`;
}

export async function seed() {
    return dynamo.send(new CreateTableCommand({
        TableName : tables.settings,
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
}
