import { column, html } from "@/packages/lazarus";
import prisma from '@/libs/prisma';

const Posts = {
  model() {
    return prisma.post;
  },
  label() {
    return "Posts";
  },
  search() {
    return ["id", "title"];
  },
  listColumns() {
    return [
      column.make("#", "id").setWidth(400),
      column.make("Título", "title").setHandler((row: any) => row.title),
      column.make("Conteúdo", "content"),
      column.make("Teste").setHandler((row: any) => html.make("p").setAttributes({ style: { color: "red" } }).setChildren([
        html.make("b").setChildren(row.title),
      ])),
    ]
  },
  listTopSlot() {
    return [
      html.make("h1").setAttributes({ style: { color: "blue" } }).setChildren("Top Slot Example 1"),
      html.make("h1").setAttributes({ style: { color: "red" } }).setChildren([
        html.make("b").setChildren("Top Slot Example 2"),
      ]),
    ]
  },
  listBottomSlot() {
    return [
      html.make("h1").setAttributes({ style: { color: "blue" } }).setChildren("Bottom Slot Example 1"),
      html.make("h1").setAttributes({ style: { color: "red" } }).setChildren([
        html.make("b").setChildren("Bottom Slot Example 2"),
      ]),
    ]
  }
}

export default Posts;