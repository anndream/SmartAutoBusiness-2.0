export interface IDataListTrigger {
    ADD_ROW: string,
    ADD_CHILD_ROW: string,
    EDIT_ROW: string,
    EDIT_ROWS: string,
    CANCEL_NEW_ROW: string,
    CANCEL_NEW_ROWS: string,
    CANCEL_EDIT_ROW: string,
    CANCEL_EDIT_ROWS: string,
    SEARCH_ROW: string,
    CANCEL_SEARCH_ROW: string,
    CHANGE_ADDED_ROWS_TO_TEXT: string,
    CHANGE_EDITED_ROWS_TO_TEXT: string,
    SHOW_INVALIDATE_ADDED_ROWS: string,
    SHOW_INVALIDATE_EDITED_ROWS: string,

    DIALOG: string,
    WINDOW: string,
    UPLOAD: string,
    DIALOG_BATCH: string,
    LAYOUT_DIALOG: string,
    CONFIRM: string,
    CHECKED_ITEMS_IDS_CONFIRM: string,
    MESSAGE: string,
    LOAD_REFRESH_DATA: string

    REFRESH: string,
    HIDDEN: string,
    SHOW: string,
    EXPORT: string,
    IMPORT: string,
    DOWNLOAD: string,
    SELECT_ROW: string,
    CHECK_ROW: string,
    REFRESH_AS_CHILD: string,
    LOAD_BY_FILTER: string,
    SET_SELECT_ROW: string,
    ADD_LIST_ITEM: string,
    EDIT_LIST_ITEM: string,

    LINK: string,
    LINK_TO: string,

    SAVE_ROW: string,
    SAVE_ROWS: string,
    DELETE_CURRENT_ROW: string,
    DELETE_CHECKED_ROWS: string,
    EXECUTE_CURRENT_ROW: string,
    EXECUTE_SELECTED_ROW: string,
    EXECUTE_CHECKED_ROWS: string,
    EXECUTE_CHECKED_ROWS_IDS: string
}

/**
 * 表格功能触发器
 */
export const BSN_DATAGRID_TRIGGER: IDataListTrigger = {
    // state
    ADD_ROW: 'ADD_ROW',
    ADD_CHILD_ROW: 'ADD_CHILD_ROW',
    EDIT_ROW: 'EDIT_ROW',
    EDIT_ROWS: 'EDIT_ROWS',
    CANCEL_EDIT_ROW: 'CANCEL_EDIT_ROW',
    CANCEL_EDIT_ROWS: 'CANCEL_EDIT_ROWS',
    CANCEL_NEW_ROW: 'CANCEL_NEW_ROW',
    CANCEL_NEW_ROWS: 'CANCEL_NEW_ROWS',
    SEARCH_ROW: 'SEARCH_ROW',
    CANCEL_SEARCH_ROW: 'CANCEL_SEARCH_ROW',
    CHANGE_ADDED_ROWS_TO_TEXT: 'CHANGE_ADDED_ROWS_TO_TEXT',
    CHANGE_EDITED_ROWS_TO_TEXT: 'CHANGE_EDITED_ROWS_TO_TEXT',
    SHOW_INVALIDATE_ADDED_ROWS: 'SHOW_INVALIDATE_ADDED_ROWS',
    SHOW_INVALIDATE_EDITED_ROWS: 'SHOW_INVALIDATE_EDITED_ROWS',

    // action
    DIALOG: 'DIALOG',
    WINDOW: 'WINDOW',
    UPLOAD: 'UPLOAD',
    DIALOG_BATCH: 'DIALOG_BATCH',
    LAYOUT_DIALOG: "LAYOUT_DIALOG",
    CONFIRM: 'CONFIRM',
    CHECKED_ITEMS_IDS_CONFIRM: 'CHECKED_ITEMS_IDS_CONFIRM',
    MESSAGE: 'MESSAGE',
    LOAD_REFRESH_DATA: 'LOAD_REFRESH_DATA',


    // behavior
    REFRESH: 'REFRESH',
    REFRESH_AS_CHILD: 'REFRESH_AS_CHILD',
    LOAD_BY_FILTER: 'LOAD_BY_FILTER',
    HIDDEN: 'HIDDEN',
    SHOW: 'SHOW',
    EXPORT: 'EXPORT',
    IMPORT: 'IMPORT',
    DOWNLOAD: 'DOWNLOAD',
    SELECT_ROW: 'SELECT_ROW',
    SET_SELECT_ROW: 'SET_SELECT_ROW',
    CHECK_ROW: 'CHECK_ROW',
    ADD_LIST_ITEM: "ADD_LIST_ITEM",
    EDIT_LIST_ITEM: "EDIT_LIST_ITEM",

    LINK: 'LINK',
    LINK_TO: 'LINK_TO',

    // operation
    SAVE_ROW: 'SAVE_ROW',
    SAVE_ROWS: 'SAVE_ROWS',
    DELETE_CURRENT_ROW: 'DELETE_CURRENT_ROW',
    DELETE_CHECKED_ROWS: 'DELETE_CHECKED_ROWS',
    EXECUTE_CURRENT_ROW: 'EXECUTE_CURRENT_ROW',
    EXECUTE_SELECTED_ROW: 'EXECUTE_SELECTED_ROW',
    EXECUTE_CHECKED_ROWS: 'EXECUTE_CHECKED_ROWS',
    EXECUTE_CHECKED_ROWS_IDS: 'EXECUTE_CHECKED_ROWS_IDS'
}