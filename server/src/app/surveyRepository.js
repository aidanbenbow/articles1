import { UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb"


export class SurveyRepository {

    constructor(docClient) {
        this.docClient = docClient
        this.tableName =
            process.env.SURVEY_TABLE || "surveyResults"
    }


    async getSurveyResults(surveyId) {

        const command = new GetCommand({
            TableName: this.tableName,

            Key: {
                surveyId
            }
        })


        const result =
            await this.docClient.send(command)


        return result.Item || {}
    }


    async recordSurveyResponse(
        surveyId,
        optionIndex
    ) {

        const command = new UpdateCommand({

            TableName: this.tableName,

            Key: {
                surveyId
            },

            UpdateExpression: `
                SET responses.#option =
                    if_not_exists(responses.#option, :zero) + :inc,
                totalResponses =
                    if_not_exists(totalResponses, :zero) + :inc
            `,

            ExpressionAttributeNames: {
                "#option": String(optionIndex)
            },

            ExpressionAttributeValues: {
                ":zero": 0,
                ":inc": 1
            },

            ReturnValues: "ALL_NEW"
        })


        const result =
            await this.docClient.send(command)


        return result.Attributes || {}
    }
}