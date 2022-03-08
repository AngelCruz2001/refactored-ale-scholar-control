import download from 'downloadjs';
import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import { studentClearData } from './student';
import { uiFinishLoading, uiFinishLoadingDocument, uiSetCurrent, uiStartLoading, uiStartLoadingDocument } from './ui';

export const documentStartGetDocuments = (matricula) => {
    return async (dispatch) => {
        try {
            dispatch(uiStartLoading())
            const res = await fetchConToken(`documents/students/${matricula}/check`)
            const body = await res.json()
            if (body.ok) {
                dispatch(documentSetDocumentsAvailable(body.document_types))
                console.log(body)
            } else {
                console.log(body)
                Swal.fire({
                    title: '¡Oops!',
                    text: body.msg,
                    icon: 'question',
                })
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
        dispatch(uiFinishLoading())

    }
}
export const documentStartGenerateDocument = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(uiStartLoadingDocument())
            const { document, student } = getState();
            const res = await fetchConToken(`documents/${document.idDocument}/students/${student.matricula}`, {
                id_group: student.id_group,
            }, 'POST')
            const blob = await res.blob();
            const statusDocument = download(blob, "test.pdf");
            console.log(statusDocument)
            if (statusDocument) {
                Swal.fire({
                    title: '¡Exito!',
                    text: 'Se ha generado el documento',
                    icon: 'success',
                })
            }
            else {
                Swal.fire({
                    title: '¡Oops!',
                    text: 'No se ha podido generar el documento, por favor intente de nuevo más tarde',
                    icon: 'error',
                })
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
        dispatch(studentClearData())
        dispatch(documentClearData())
        dispatch(uiSetCurrent(0))
        dispatch(uiFinishLoadingDocument())
    }
}

const documentSetDocumentsAvailable = (documents) => ({
    type: types.documentSetDocumentsAvailable,
    payload: documents
})



const documentClearActiveDocument = () => ({ type: types.documentClearActive })

export const documentSetDocument = (idDocument) => ({ type: types.documentSetDocument, payload: idDocument })

export const documentClearData = () => ({ type: types.documentClearData })
