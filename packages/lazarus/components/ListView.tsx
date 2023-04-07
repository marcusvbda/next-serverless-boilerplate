import { useCallback, useEffect, useState } from "react";
import { LaravelListView, ResponsiveRow, Mg, Title} from "../styles";
import { isClientSide, lzResolver } from "../utils";
import { LZ_COLORS  } from "@/lzConstants";
import { RenderSlot } from "./RenderSlot";
import { BtnCreate } from "./BtnCreate";
import { DataTable } from "./Datatable";

export const ListView = (props:any) => {
  const [visible,setVisible] = useState(false)
  const [listTopSlot,setListTopSlot] = useState(props.listTopSlot || [])
  const [listBottomSlot,setListBottomSlot] = useState(props.listTopSlot || [])
  const payload = props.payload ?? {}

  const fetchSlots = useCallback(async (action:any,setter:any) => {
    const request = await lzResolver(action,{
      resource: payload.resource
    })
    setter(request?.result || [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {  
    if (isClientSide()) {
      fetchSlots("listTopSlot",setListTopSlot)
      fetchSlots("listBottomSlot",setListBottomSlot)
      setVisible(true)
    }
  },[fetchSlots])

  if(!visible) return <></>

  return (
    <LaravelListView style={LZ_COLORS as any}>
      {listTopSlot.length > 0 && <Mg top={30}><RenderSlot slots={listTopSlot}/></Mg>}
      <ResponsiveRow>
        <Title>{payload.title}</Title>
        <BtnCreate resource={payload.resource}>
          {payload.createBtnText}
        </BtnCreate>
      </ResponsiveRow>
      <DataTable resource={payload.resource} listColumns={payload.listColumns}/>
      {listBottomSlot.length > 0 && <Mg top={30} bottom={100}><RenderSlot slots={listBottomSlot}/></Mg>}
    </LaravelListView>
  );
};