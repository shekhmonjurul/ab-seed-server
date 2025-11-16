export default function throwError(logic, errorMessage) {
    if (logic) throw new Error(errorMessage);
}