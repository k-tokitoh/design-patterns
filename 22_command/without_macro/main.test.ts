import { expect, test } from "vitest";
import { Editor } from "./main";

test("insert", () => {
  const editor = new Editor();
  const { client } = editor;
  client.input("a", editor.currentTab);
  client.input("b", editor.currentTab);
  client.input("c", editor.currentTab);
  expect((editor as any).tabs[0].toString()).toBe("abc");
});

test("switchTab", () => {
  const editor = new Editor();
  const { client } = editor;
  client.input("a", editor.currentTab);
  client.input("b", editor.currentTab);
  editor.switchTab(1);
  client.input("x", editor.currentTab);
  client.input("y", editor.currentTab);
  client.input("z", editor.currentTab);
  editor.switchTab(0);
  client.input("c", editor.currentTab);
  expect((editor as any).tabs[0].toString()).toBe("abc");
  expect((editor as any).tabs[1].toString()).toBe("xyz");
});

test("delete", () => {
  const editor = new Editor();
  const { client } = editor;
  client.input("a", editor.currentTab);
  client.input("b", editor.currentTab);
  client.input("\b", editor.currentTab);
  client.input("c", editor.currentTab);
  expect((editor as any).tabs[0].toString()).toBe("ac");
});

test("undo insert", () => {
  const editor = new Editor();
  const { client } = editor;
  client.input("a", editor.currentTab);
  client.input("b", editor.currentTab);
  client.input("c", editor.currentTab);
  editor.undo();
  editor.undo();
  client.input("d", editor.currentTab);
  expect((editor as any).tabs[0].toString()).toBe("ad");
});

test("undo delete", () => {
  const editor = new Editor();
  const { client } = editor;
  client.input("a", editor.currentTab);
  client.input("b", editor.currentTab);
  client.input("\b", editor.currentTab);
  editor.undo();
  client.input("c", editor.currentTab);
  expect((editor as any).tabs[0].toString()).toBe("abc");
});

test("redo insert", () => {
  const editor = new Editor();
  const { client } = editor;
  client.input("a", editor.currentTab);
  client.input("b", editor.currentTab);
  client.input("c", editor.currentTab);
  client.input("d", editor.currentTab);
  editor.undo();
  editor.undo();
  editor.redo();
  client.input("e", editor.currentTab);
  expect((editor as any).tabs[0].toString()).toBe("abce");
});

test("redo delete", () => {
  const editor = new Editor();
  const { client } = editor;
  client.input("a", editor.currentTab);
  client.input("b", editor.currentTab);
  client.input("c", editor.currentTab);
  client.input("\b", editor.currentTab);
  client.input("\b", editor.currentTab);
  editor.undo();
  editor.undo();
  editor.redo();
  client.input("d", editor.currentTab);
  expect((editor as any).tabs[0].toString()).toBe("abd");
});
