/**
 * @name dashboardConfig
 * @description Config for all pages of supplier side flow, pages are:
 * STATE_SIDEBAR = ["profileEdit", "addTour", "updateTour", "dashboard"]; 
 * each key is an object with different fields
 * @param {String} header: header of the page
 * @param {Array} sections: Different sections the page is divided into
 * @param {object} sectionKey: {
 *  @param {Array} fields : different fields/components in the section 
 *  @param {String} header: Heading of the section
 * }
 */
export const dashboardConfig = {
  profileEdit: {
    header: "Edit your host profile",
    sections: ["personal","location", "company"],
    personal: {
      fields: ["photo","firstname", "lastname","instagram"],
      header: "Personal:"
    },
    location: {
      fields: ["country", "address", "city", "state", "zip", "phone"],
      header: "Location:"
    },
    company: {
      fields: ["gallery-vertical", "website", "facebook", "instagram", "bio"],
      header: "Company:"
    }
  },
  addTour: {
    header: "Add a new tour",
    sections : ["InfoComponent", "ItineraryComponent", "AccomodationComponent", "GalleryComponent"],
    InfoComponent: {
      fields: ["tourtitle", "tourlocation","tourtype","daysnumber", "startdate", "maxpeople","price","currency"],
      header: "General Info: "
    },
    ItineraryComponent: {
      fields: ["dayText", "dayText", "addDay"],
      header: "Itinerary:"
    },
    AccomodationComponent: {
      fields: ["dayText"],
      //fields: ["daySelector", "addDay"],
      header: "Accomodation: "
    },
    GalleryComponent: {
      fields: ["dayText"],
      //fields: ["gallery-horizontal"],
      header: "Gallery: "
    }
  },
  updateTour: {
    header: "Update an active tour",
    sections : ["InfoComponent", "ItineraryComponent", "AccomodationComponent", "GalleryComponent"],
    InfoComponent: {
      fields: ["tourtitle", "tourlocation","tourtype","daysnumber", "startdate", "maxpeople","price","currency"],
      header: "General Info: "
    },
    ItineraryComponent: {
      fields: ["dayText", "dayText", "addDay"],
      header: "Itinerary:"
    },
    AccomodationComponent: {
      fields: ["daySelector", "addDay"],
      header: "Accomodation: "
    },
    GalleryComponent: {
      fields: ["gallery-horizontal"],
      header: "Gallery: "
    }
  },
  dashboard: {
    header: "Dashboard",
    sections: ["booking", "invoices", "reviews", "library"],
    booking: {
      fields: ["bookingComponent"],
      header: "Bookings: "
    },
    invoices: {
      fields: ["invoiceComponent"],
      header: "Invoices:"
    },
    reviews: {
      fields: ["reviewComponent"],
      header: "Reviews:"
    },
    library: {
      fields: ["gallery-horizontal"],
      header: "Media Library:"
    }
    
  }
}