//need dataframe-js, jexcel
class CameoSheet extends HTMLElement {
  connectedCallback() {
    this.str_random_id = "id_" + Math.random().toString(36).substr(2, 9);
    this.innerHTML = `
      <div id="${this.str_random_id}"></div>
    `;
    this.render();
  }
  async render() {
    let str_url = window.location.href + this.getAttribute("src");
    console.log(str_url);
    let df = await dfjs.DataFrame.fromCSV(str_url);
    console.log(df);
    let ary = df.toArray();
    console.log(ary);
    let ary_head = [];
    let i;
    let ary_columns = df.listColumns();
    for (i = 0; i < ary_columns.length; i++) {
      ary_head.push({ title: ary_columns[i], width: 100 });
    }
    console.log(ary_head);
    jexcel(document.getElementById(this.str_random_id), {
      data: ary,
      columns: ary_head
    });
  }
}
customElements.define("cameo-sheet", CameoSheet);
