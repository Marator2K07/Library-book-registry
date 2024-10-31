import { DIGITAL_BOOK_TYPE, GRAPHIC_BOOK_TYPE, PRINTED_BOOK_TYPE } from "./constants";

export const publicationTypeToString = (type) => {
    switch (type) {
        case GRAPHIC_BOOK_TYPE:
            return "GRAPHIC";
        case DIGITAL_BOOK_TYPE:
            return "DIGITAL";
        case PRINTED_BOOK_TYPE:
            return "PRINTED";

        default:
            return "Unknown";
    }
}
