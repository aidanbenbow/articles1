import {
  PutCommand,
  DeleteCommand,
  GetCommand,
  ScanCommand
} from "@aws-sdk/lib-dynamodb";

export class ArticlesRepository {
  constructor(docClient) {
    this.docClient = docClient;
    this.tableName = process.env.ARTICLES_TABLE || "articles_table";
  }

  async saveArticle(article) {
    await this.docClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: article
      })
    );
    return article;
  }

  async createArticle(article) {
    return this.saveArticle(article);
  }

  async updateArticle(articleId, updates) {
    const existing = await this.fetchArticle(articleId);
    const nextArticle = {
      ...(existing ?? {}),
      ...updates,
      articleId,
      createdAt: existing?.createdAt ?? updates?.createdAt ?? Date.now(),
      updatedAt: Date.now(),
    };

    return this.saveArticle(nextArticle);
  }
  async markArticleAsComplete(articleId) {
    const existing = await this.fetchArticle(articleId);
    if (!existing) {
      throw new Error(`Article with ID ${articleId} not found`);
    }
    const nextArticle = {
      ...existing,
      completed: false,
      updatedAt: Date.now(),
    };
    console.log(`Marking article ${articleId} as complete. Updated article:`, nextArticle);
    return this.saveArticle(nextArticle);
  }

  async fetchArticle(articleId) {
    const result = await this.docClient.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { articleId }
      })
    );
    return result.Item || null;
  }

  async fetchAllArticles() {
    const items = [];
    let ExclusiveStartKey;

    do {
      const result = await this.docClient.send(
        new ScanCommand({
          TableName: this.tableName,
          ExclusiveStartKey,
        })
      );

      items.push(...(result.Items || []));
      ExclusiveStartKey = result.LastEvaluatedKey;
    } while (ExclusiveStartKey);

    return items.sort((a, b) => (b?.updatedAt ?? 0) - (a?.updatedAt ?? 0));
  }

  async deleteArticle(articleId) {
    await this.docClient.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { articleId }
      })
    );
    return true;
  }
}
