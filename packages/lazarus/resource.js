import { column } from "./column";
import { LZ_RESOURCES_PATH } from "lzConstants";

export const resource = {
  resourceName : "resourceName",
  label() {
    return "Resources"
  },
  model() {
    return null
  },
  singularLabel() {
    return this.label().slice(0,-1)
  },
  createBtnText() {
    return `Criar ${this.singularLabel()}`
  },
  listViewProps() {
    return {
      title : this.label(),
      resource : this.resourceName,
      createBtnText : this.createBtnText(),
    }
  },
  searchText() {
    return `Pesquisar ${this.label().toLowerCase()} ...`
  },
  async require(resourceName) {
    const resolved = (await import(`@/resources/${resourceName}`)).default
    return {
      ...this,
      ...resolved,
      resourceName
    }
  },
  async resolve(action,body) {
    const resolvedResource = await this.require(body.resource)
    return resolvedResource[action] ? resolvedResource[action](body) : false
  },
  getVisibleListFields(list) {
    return list.filter(x=>x.visible)
  },
  datatableConfig() {
    const listColumns = this.getVisibleListFields(this.listColumns());
    return {
      listColumns,
      searchText : this.searchText(),
      noResultText : this.noResultText(),
      showBasicFilter : this.search().length > 0,
      sort : this.defaultSort(),
    }
  },
  search() {
    return []
  },
  noResultText() {
    return `Nenhum ${this.singularLabel()} encontrado`
  },
  listColumns() {
    return [
      column.make("#").setHandler(()=>"Set your resources columns in listColumns ").setWidth(400),
    ]
  },
  listTopSlot() {
    return []
  },
  listBottomSlot() {
    return []
  },
  canCreate() {
    return true
  },
  filters() {
    return []
  },
  makeBasicFilterPayload(body) {
    const fields = this.search();
    const searchTerm = body.filter ?? "";
    const filters = [];
    if (Array.isArray(fields) && searchTerm.length && fields.length) {
      for(let filter of fields) {
        filters.push({
          [filter] : {
            contains : searchTerm,
            mode: 'insensitive' 
          }
        })
      }
      return {where : {OR : filters}}
    }
    return {}
  },
  makeSortPayload(body) {
    const fallback = {orderBy : this.defaultSort() ?? {}}
    let payload = {}
    if((body.sort && body.sort.length)) {
      payload.orderBy = {
        [body.sort[0]] : body.sort[1]
      }
      return payload
    }
    return fallback
  },
  defaultSort() {
    return {id : "desc"}
  },
  totalListText(total) {
    return `Total de registros: ${total}`
  },
  perPage() {
    return 10
  },
  makePaginationPayload(body) {
    const page = body.page ?? 1; 
    const take = this.perPage();
    const skip = (page - 1) * take; 
    return {page,skip,take}
  },
  async resolveListData(body) {
    const model = this.model();
    if(!model ) return [];
    
    const pagination = this.makePaginationPayload(body);
    const sort = this.makeSortPayload(body);
    const filter = this.makeBasicFilterPayload(body);


    const list = await model.findMany({ 
      ...{take : pagination.take,skip : pagination.skip},
      ...sort,
      ...filter
    });

    const totalItems = await model.count({where : filter.where});
    
    return {
      items : this.processListData(list),
      pagination : {
        ...pagination,
        total  : totalItems,
        perPage : this.perPage(),
        totalText : this.totalListText(totalItems)
      }
    }
  },
  processListData(data) {
    const fallback = " - ";
    const listColumns = this.getVisibleListFields(this.listColumns());
    const result = data.map(row=>{
      const item = []
      listColumns.forEach(col=>{
        if(col?.index && (typeof col.index == "string")) {
          item.push(row[col.index] ?? fallback)
        }  else if(col?.handler && (typeof col.handler == "function")) {
          item.push(col.handler(row) ?? fallback)
        }
      })
      return item
    })
    return result
  }
}