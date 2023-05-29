import mongoose, { Schema, SchemaDefinition } from 'mongoose';

export default function generateSchema(
  properties: SchemaDefinition<any>,
  collection: string,
): Schema {
  return new mongoose.Schema(properties, { timestamps: true, collection });
}
