import axios from 'axios';
import {
    ADD_COMPILATION_CHALLENGE,
    MODIFY_COMPILATION_CHALLENGE,
    ADD_TEST_CHALLENGE,
    MODIFY_TEST_CHALLENGE,
    //DELETE_CHALLENGE,
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE
} from '../constants/ActionTypesChallenges'

export const cretateCompilationChallenge = (challenge) => {
  return {
    type: ADD_COMPILATION_CHALLENGE,
    challenge
  }
}

export const cretateTestChallenge = (challenge) => {
    return {
      type: ADD_TEST_CHALLENGE,
      challenge
    }
}

export const modifyCompilationChallenge = (challenge) => {
    return {
      type: MODIFY_COMPILATION_CHALLENGE,
      challenge
    }
}

export const modifyTestChallenge = (challenge) => {
    return {
      type: MODIFY_TEST_CHALLENGE,
      challenge
    }
}

// export const deleteChallenge = (id) => {
//   return {
//     type: DELETE_CHALLENGE,
//     id
//   }
// }


const fetchDataRequest = () => {
    return {
      type: FETCH_DATA_REQUEST
    }
}

const fetchDataSucess = data => {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: data
    }
}

const fetchDataFailure = error => {
    return {
        type: FETCH_DATA_FAILURE,
        payload: error
    }
}

export const addCompilationChallenge = (state) => {
    console.log("param addCompilationChallenge");
    console.log(state.user_id);
    console.log(state.title);
    console.log(state.class_name);
    console.log(state.description);
    console.log(state.source);
    console.log(state.point);
    console.log(state.owner_solution_id);
    console.log("....................");
    return function(dispatch) {
        dispatch(fetchDataRequest())
        axios.post('http://localhost:55555/compilationChallenge/create', null, {
            params:{
                userId: state.user_id,
                title: state.title,
                className: state.class_name,
                description: state.description,
                source: state.source,
                point: state.point,
                ownerSolutionId: state.owner_solution_id
            },
            headers: {
                Authorization: "Basic" + localStorage.getItem("token")
            }
        })
        .then( res => {
        console.log("res.data-ADD_COMPILATION");
        console.log(res.data);
            dispatch(fetchDataSucess(res.data))
        })
        .catch( error => {
            dispatch(fetchDataFailure(error.message))
        })
    }
}

export const addTestChallenge = (state) => {
    return function(dispatch) {
        dispatch(fetchDataRequest())
        axios.post('http://localhost:55555/testChallenge/create', null, {
            params:{
                userId: state.user_id,
                title: state.title,
                className: state.class_name,
                description: state.description,
                source: state.source,
                point: state.point,
                ownerSolutionId: state.owner_solution_id,
                test: state.test
            },
            headers: {
                Authorization: "Basic" + localStorage.getItem("token")
            }
        })
        .then( res => {
        console.log("res.data-ADD_TEST");
        console.log(res.data);
            dispatch(fetchDataSucess(res.data))
        })
        .catch( error => {
            dispatch(fetchDataFailure(error.message))
        })
    }
}

// export const deleteChallenge = (id) => {
//     console.log("param delete");
//     console.log(id);
//     return function(dispatch) {
//         dispatch(fetchDataRequest())
//         axios.delete('http://localhost:55555//challenge/' + id )
//         .then( res => {
//         console.log("res.data-DELETE");
//         console.log(res.data);
//             dispatch(fetchDataSucess(id))
//         })
//         .catch( error => {
//             dispatch(fetchDataFailure(error.message))
//         })
//     }
// }

// export const modifyCompilationChallenge = (state) =>{
//     return function(dispatch) {
//         dispatch(fetchDataRequest())
//         axios.put('http://localhost:55555/compilationChallenge/modify', {
//             id: state.id,
//             title: state.title,
//             className: state.class_name,
//             description: state.description,
//             source: state.source,
//             point: state.point
//         })
//         .then( res => {
//         console.log("res.data-MODIFY_COMPILATION");
//         console.log(res.data);
//             dispatch(fetchDataSucess(res.data))
//         })
//         .catch( error => {
//             dispatch(fetchDataFailure(error.message))
//         })
//     }
// }

// export const modifyTestChallenge = (state) =>{
//     return function(dispatch) {
//         dispatch(fetchDataRequest())
//         axios.put('http://localhost:55555/testChallenge/modify', {
//             id: state.id,
//             title: state.title,
//             className: state.class_name,
//             description: state.description,
//             source: state.source,
//             point: state.point,
//             test: state.test
//         })
//         .then( res => {
//         console.log("res.data-MODIFY_TEST");
//         console.log(res.data);
//             dispatch(fetchDataSucess(res.data))
//         })
//         .catch( error => {
//             dispatch(fetchDataFailure(error.message))
//         })
//     }
// }