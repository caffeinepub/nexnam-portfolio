import Time "mo:core/Time";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  type Project = {
    title : Text;
    description : Text;
    category : Text;
    image : Text;
    results : Text;
  };

  type Service = {
    title : Text;
    description : Text;
    icon : Text;
  };

  type Contact = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  type Founder = {
    name : Text;
    title : Text;
    bio : Text;
    photo : Text;
  };

  let projects = Map.empty<Text, Project>();
  let services = Map.empty<Text, Service>();
  let contacts = List.empty<Contact>();

  var founder : Founder = {
    name = "Nikhil Shahi";
    title = "Founder, Business & Corporate Development";
    bio = "/Dedicated professional with a strong background in business and corporate development, currently focused on supporting early-stage projects in the blockchain space./";
    photo = "/images/aboutImage.png";
  };

  var isAdmin = false;

  let adminPassword : Text = "Nikhil@123";

  public shared ({ caller }) func authenticate(password : Text) : async () {
    if (Text.equal(password, adminPassword)) {
      isAdmin := true;
    } else {
      Runtime.trap("Invalid password");
    };
  };

  public query ({ caller }) func isAdminAuthenticated() : async Bool {
    isAdmin;
  };

  // Founder
  public shared ({ caller }) func updateFounder(name : Text, title : Text, bio : Text, photo : Text) : async () {
    if (not isAdmin) { Runtime.trap("Unauthorized") };
    founder := { name; title; bio; photo };
  };

  public query ({ caller }) func getFounder() : async Founder {
    founder;
  };

  // Projects
  public shared ({ caller }) func addProject(title : Text, description : Text, category : Text, image : Text, results : Text) : async () {
    if (not isAdmin) { Runtime.trap("Unauthorized") };
    let project : Project = { title; description; category; image; results };
    projects.add(title, project);
  };

  public shared ({ caller }) func updateProject(title : Text, description : Text, category : Text, image : Text, results : Text) : async () {
    if (not isAdmin) { Runtime.trap("Unauthorized") };
    switch (projects.get(title)) {
      case (?_existing) {
        let project : Project = { title; description; category; image; results };
        projects.add(title, project);
      };
      case (null) {
        Runtime.trap("Project not found");
      };
    };
  };

  public shared ({ caller }) func deleteProject(title : Text) : async () {
    if (not isAdmin) { Runtime.trap("Unauthorized") };
    if (projects.containsKey(title)) {
      projects.remove(title);
    } else {
      Runtime.trap("Project not found");
    };
  };

  public query ({ caller }) func getProject(title : Text) : async ?Project {
    projects.get(title);
  };

  public query ({ caller }) func getAllProjects() : async [Project] {
    let iter = projects.entries();
    let projectList = List.empty<Project>();

    iter.forEach(
      func((_, project)) {
        projectList.add(project);
      }
    );

    projectList.toArray();
  };

  // Services
  public shared ({ caller }) func addService(title : Text, description : Text, icon : Text) : async () {
    if (not isAdmin) { Runtime.trap("Unauthorized") };
    let service : Service = { title; description; icon };
    services.add(title, service);
  };

  public shared ({ caller }) func updateService(title : Text, description : Text, icon : Text) : async () {
    if (not isAdmin) { Runtime.trap("Unauthorized") };
    switch (services.get(title)) {
      case (?_existing) {
        let service : Service = { title; description; icon };
        services.add(title, service);
      };
      case (null) {
        Runtime.trap("Service not found");
      };
    };
  };

  public shared ({ caller }) func deleteService(title : Text) : async () {
    if (not isAdmin) { Runtime.trap("Unauthorized") };
    if (services.containsKey(title)) {
      services.remove(title);
    } else {
      Runtime.trap("Service not found");
    };
  };

  public query ({ caller }) func getService(title : Text) : async ?Service {
    services.get(title);
  };

  public query ({ caller }) func getAllServices() : async [Service] {
    let iter = services.entries();
    let serviceList = List.empty<Service>();

    iter.forEach(
      func((_, service)) {
        serviceList.add(service);
      }
    );

    serviceList.toArray();
  };

  // Contacts
  public shared ({ caller }) func submitContact(name : Text, email : Text, message : Text) : async () {
    let contact : Contact = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contacts.add(contact);
  };

  public query ({ caller }) func getContacts() : async [Contact] {
    contacts.toArray();
  };
};
