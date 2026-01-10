import { UploadWidgetUploadListItem } from "./upload-widget-upload-list-item";

export function UplaodWidgetUploadList() {

  const isUploadListEmpty = false

  return (
    <div className="px-3 flex flex-col gap-3">
      <span className="text-xs font-medium">
        Uploaded files{' '}
        <span className="text-zinc-400">(2)</span>
      </span>

      {isUploadListEmpty ? (
        <span className="text-xs text-zinc-400">No uploads added</span>
      ) : (
        <div className="flex flex-col gap-2">
          <UploadWidgetUploadListItem />
          <UploadWidgetUploadListItem />
          <UploadWidgetUploadListItem />
        </div>
      )
      }
    </div >
  )
}