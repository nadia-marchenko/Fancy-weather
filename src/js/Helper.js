export default class Helper {
  static async fetchPost(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }
}