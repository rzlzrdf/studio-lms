import {chapterType} from './chapterType'
import {classType} from './classType'
import {courseType} from './courseType'
import {userChapterType} from './userChapterType'
import {userClassType} from './userClassType'
import {userType} from './userType'
import {todoItem} from './todoItem'
import {todoType} from './todoType'
import { resourceObject } from './resourceType'
import { soalObject } from './soalType'
import { optionAnswerType } from './optionAnswerType'

export const schemaTypes = [
    userType,
    classType,
    courseType,
    chapterType,
    resourceObject,
    userChapterType,
    userClassType,
    todoItem,
    todoType,
    soalObject,
    optionAnswerType,
]
