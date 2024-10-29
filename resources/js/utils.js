import { DIGITAL_BOOK_TYPE, GRAPHIC_BOOK_TYPE, PRINTED_BOOK_TYPE } from "./constants";

export const publicationTypeToString = (type) => {
    switch (type) {
        case GRAPHIC_BOOK_TYPE:
            return "Graphic";
        case DIGITAL_BOOK_TYPE:
            return "Digital";
        case PRINTED_BOOK_TYPE:
            return "Printed";

        default:
            return "Unknown";
    }
}
