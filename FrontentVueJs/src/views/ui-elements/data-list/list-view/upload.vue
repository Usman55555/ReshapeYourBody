<template>
  <div>
    <!-- tab 1 content -->
    <div class="vx-row tab1">
      <div class="vx-col md:w-1/2 w-full mt-5">
        <vs-input v-if="this.lang=='de'"
          label="Name eingeben"
          v-model="file.name"
          class="w-full"
          v-validate="'required'"
          name="name"
        />
         <vs-input v-else-if="this.lang=='sp'"
          label="Ingrese su nombre"
          v-model="file.name"
          class="w-full"
          v-validate="'required'"
          name="name"
        />
         <vs-input v-else
          label="Enter Name"
          v-model="file.name"
          class="w-full"
          v-validate="'required'"
          name="name"
        />
        <span class="text-danger text-sm" v-show="errors.has('name')">
          {{
          errors.first("name")
          }}
        </span>
      </div>
      <div class="vx-col md:w-1/2 w-full mt-5">
        <vs-select v-if="this.lang=='de'"
          v-model="file.category"
          class="w-full select-large"
          label="Bitte wählen Sie Kategorie"
          v-validate="'required'"
          name="category"
        >
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item, index) in Category_German"
            class="w-full"
          />
        </vs-select>
            <vs-select v-else-if="this.lang=='sp'"
          v-model="file.category"
          class="w-full select-large"
          label="Por favor elija categoría"
          v-validate="'required'"
          name="category"
        >
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item, index) in Category_Spanish"
            class="w-full"
          />
        </vs-select>
            <vs-select v-else
          v-model="file.category"
          class="w-full select-large"
          label="Please Choose Category"
          v-validate="'required'"
          name="category"
        >
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item, index) in Category"
            class="w-full"
          />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('category')">
          {{
          errors.first("category")
          }}
        </span>
      </div>
      <div class="vx-col md:w-full w-full mt-4">
        <h3 v-if="this.lang=='de'">Bitte wählen Sie Berechtigung:</h3>
        <h3 v-else-if="this.lang=='sp'">Por favor seleccione permiso::</h3>
        <h3 v-else>Please Select Permission:</h3>
        <ul class="centerx">
          <div class="vx-row" v-if="this.lang=='de'">
            <div class="vx-col md:w-1/3 w-full mt-5">
              <li>
                <vs-checkbox v-model="file.userAllowed" vs-value="user">Nutzer</vs-checkbox>
              </li>
            </div>
            <div class="vx-col md:w-1/3 w-full mt-5">
              <li>
                <vs-checkbox v-model="file.userAllowed" vs-value="customer">Kunde</vs-checkbox>
              </li>
            </div>
            <div class="vx-col md:w-1/3 w-full mt-5">
              <li>
                <vs-checkbox v-model="file.userAllowed" vs-value="partner">Partner</vs-checkbox>
              </li>
            </div>
          </div>
          <div class="vx-row" v-else-if="this.lang=='sp'">
            <div class="vx-col md:w-1/3 w-full mt-5">
              <li>
                <vs-checkbox v-model="file.userAllowed" vs-value="user">Nutzer</vs-checkbox>
              </li>
            </div>
            <div class="vx-col md:w-1/3 w-full mt-5">
              <li>
                <vs-checkbox v-model="file.userAllowed" vs-value="customer">cliente</vs-checkbox>
              </li>
            </div>
            <div class="vx-col md:w-1/3 w-full mt-5">
              <li>
                <vs-checkbox v-model="file.userAllowed" vs-value="partner">compañero</vs-checkbox>
              </li>
            </div>
          </div>
          <div class="vx-row" v-else>
            <div class="vx-col md:w-1/3 w-full mt-5">
              <li>
                <vs-checkbox v-model="file.userAllowed" vs-value="user">user</vs-checkbox>
              </li>
            </div>
            <div class="vx-col md:w-1/3 w-full mt-5">
              <li>
                <vs-checkbox v-model="file.userAllowed" vs-value="customer">customer</vs-checkbox>
              </li>
            </div>
            <div class="vx-col md:w-1/3 w-full mt-5">
              <li>
                <vs-checkbox v-model="file.userAllowed" vs-value="partner">partner</vs-checkbox>
              </li>
            </div>
          </div>
        </ul>
      </div>
      <div class="vx-col md:w-full w-full mt-5">
        <vs-textarea v-if="this.lang=='de'"
          counter="500"
          label="Beschreibung"
          :counter-danger.sync="counterDanger"
          v-model="file.description"
          height="120px"
          v-validate="'required'"
          name="description"
        />
        <vs-textarea v-else-if="this.lang=='sp'"
          counter="500"
          label="Descripción"
          :counter-danger.sync="counterDanger"
          v-model="file.description"
          height="120px"
          v-validate="'required'"
          name="description"
        />
        <vs-textarea v-else
          counter="500"
          label="Description"
          :counter-danger.sync="counterDanger"
          v-model="file.description"
          height="120px"
          v-validate="'required'"
          name="description"
        />
        <span class="text-danger text-sm" v-show="errors.has('description')">
          {{
          errors.first("description")
          }}
        </span>
      </div>

      <vs-row vs-align="center" vs-type="flex" vs-justify="flex-end" vs-w="12">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4    ">
          <vs-button v-if="this.lang=='de'" color="primary" type="gradient" @click="post()">Nächster</vs-button>
          <vs-button v-else-if="this.lang=='sp'" color="primary" type="gradient" @click="post()">Próximo</vs-button>
          <vs-button v-else  color="primary" type="gradient" @click="post()">Next</vs-button>
        </vs-col>
      </vs-row>
    </div>

    <div class="vx-row tab2" style="display: none;">
      <vs-row vs-align="center" vs-type="flex" vs-justify="flex-end" vs-w="12">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4    ">
          <vs-button v-if="this.lang=='de'" color="primary" type="gradient" @click="redirect">Umleiten</vs-button>
          <vs-button v-else-if="this.lang=='sp'" color="primary" type="gradient" @click="redirect">Redirigir</vs-button>
          <vs-button v-else color="primary" type="gradient" @click="redirect">Redirect</vs-button>
        </vs-col>
      </vs-row>
      <div class="vx-col md:w-full w-full mt-5">
        <vs-input v-if="this.lang=='de'" label="Sprache eingeben" v-model="fileo.language" class="w-full" />
        <vs-input v-else-if="this.lang=='sp'" label="Ingrese idioma" v-model="fileo.language" class="w-full" />
        <vs-input v-else label="Enter Language" v-model="fileo.language" class="w-full" />
      </div>
      <div class="vx-col md:w-full w-full mt-5">
        <input
          type="file"
          name="file-2[]"
          id="file-2"
          class="inputfile inputfile-2"
          data-multiple-caption="{count} files selected"
          ref="file"
          multiple
          @click="javaScr()"
          v-on:change="handleFileUpload()"
        />
        <label for="file-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
            <path
              d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"
            />
          </svg>
          <span v-if="this.lang=='de'">Wähle eine Datei&hellip;</span>
          <span v-else-if="this.lang=='sp'">Escoge un archivo&hellip;</span>
          <span v-else>Choose a file&hellip;</span>
        </label>
      </div>
      <vs-row vs-align="center" vs-type="flex" vs-justify="flex-end" vs-w="12">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4    ">
          <vs-button v-if="this.lang=='de'" color="primary" type="gradient" @click="put()">Einreichen</vs-button>
          <vs-button v-else-if="this.lang=='sp'" color="primary" type="gradient" @click="put()">Enviar</vs-button>
          <vs-button v-else color="primary" type="gradient" @click="put()">Submit</vs-button>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>
<style>
.js .inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.inputfile + label {
  max-width: 80%;
  font-size: 1.25rem;
  /* 20px */
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  padding: 0.625rem 1.25rem;
  /* 10px 20px */
}

.no-js .inputfile + label {
  display: none;
}

.inputfile:focus + label,
.inputfile.has-focus + label {
  outline: 1px dotted rgb(247, 0, 0);
  outline: -webkit-focus-ring-color auto 5px;
}

.inputfile + label svg {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  margin-top: -0.25em;
  /* 4px */
  margin-right: 0.25em;
  /* 4px */
}
/* style 2 */
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.inputfile-2 + label {
  color: #649a4c;
  border: 2px solid currentColor;
}

.inputfile-2:focus + label,
.inputfile-2.has-focus + label,
.inputfile-2 + label:hover {
  color: #8fb67e;
}
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      textarea: "",
      counterDanger: false,
      category: "The Concept",

      objid: "",
      file: {
        category: "The Concept",
        name: "",
        description: "",
        userAllowed: ["user"]
      },
      fileo: {
        language: "",
        doc: ""
      },
      Category_Spanish: [
        { text: "El concepto", value: "The Concept" },
        { text: "PM Internacional", value: "PM International" },
        { text: "Cartas de muestra", value: "Sample Letters" },
        { text: "Documentos empresariales", value: "Business Documents" }
      ],
        Category_German: [
        { text: "Das Konzept ", value: "The Concept" },
        { text: "PM International", value: "PM International" },
        { text: "Musterbriefe", value: "Sample Letters" },
        { text: "Geschäftsdokumente", value: "Business Documents" }
      ],
      Category: [
        { text: "The Concept ", value: "The Concept" },
        { text: "PM International", value: "PM International" },
        { text: "Sample Letters", value: "Sample Letters" },
        { text: "Business Documents", value: "Business Documents" }
      ]
    };
  },
  computed: {
     lang() {
        this.graphComponent += 1
        return this.$i18n.locale
      }
  },
  methods: {
    redirect() {
      this.$router.push("/download");
    },

    disable() {
      document.getElementsByClassName("tab1")[0].style.display = "none";
      document.getElementsByClassName("tab2")[0].style.display = "block";
    },
    handleFileUpload() {
      this.fileo.doc = this.$refs.file.files[0];
      console.log("handle " + this.fileo.doc);
    },
    javaScr() {
      (function(e, t, n) {
        var r = e.querySelectorAll("html")[0];
        r.className = r.className.replace(/(^|\s)no-js(\s|$)/, "$1js$2");
      })(document, window, 0);

      ("use strict");

      (function(document, window, index) {
        var inputs = document.querySelectorAll(".inputfile");
        console.log("i am selected" + inputs);
        Array.prototype.forEach.call(inputs, function(input) {
          var label = input.nextElementSibling,
            labelVal = label.innerHTML;

          input.addEventListener("change", function(e) {
            var fileName = "";
            if (this.files && this.files.length > 1)
              fileName = (
                this.getAttribute("data-multiple-caption") || ""
              ).replace("{count}", this.files.length);
            else fileName = e.target.value.split("\\").pop();

            if (fileName) label.querySelector("span").innerHTML = fileName;
            else label.innerHTML = labelVal;
          });

          // Firefox bug fix
          input.addEventListener("focus", function() {
            input.classList.add("has-focus");
          });
          input.addEventListener("blur", function() {
            input.classList.remove("has-focus");
          });
        });
      })(document, window, 0);
    },
    post() {
      this.$validator.validateAll().then(result => {
        if (result) {
          console.log("array is" + this.file.userAllowed);
          return new Promise((resolve, reject) => {
            axios
              .post("/uploads/", this.file)
              .then(resp => {
                if (this.lang=='sp')
                {
                  this.$vs.notify({
                  title: 'primary',
                  text: 'Por favor proceda al siguiente paso',
                  color: 'primary',
                  iconPack: 'feather',
                  position: 'top-center',
                  icon:'icon-check'
                })
                }
                else if(this.lang=='de')
                {
                  this.$vs.notify({
                  title: 'primary',
                  text: 'Bitte fahren Sie mit dem nächsten Schritt fort',
                  color: 'primary',
                  iconPack: 'feather',
                  position: 'top-center',
                  icon:'icon-check'
                })
                }
                else{
                  this.$vs.notify({
                  title: 'Success',
                  text: 'Please proceed to next step !',
                  color: 'primary',
                  iconPack: 'feather',
                  position: 'top-center',
                  icon:'icon-check'
                })
                }
                
                resolve(resp);
                this.objid = resp.data._id;

                document.getElementsByClassName("tab1")[0].style.display =
                  "none";
                document.getElementsByClassName("tab2")[0].style.display =
                  "block";
              })
              .catch(err => {
                this.colorAlert = "danger";
                if (this.lang == 'de'){
                  this.$vs.dialog({
                    color: this.colorAlert,
                    title: "Ein Fehler ist aufgetreten",
                    accept: this.acceptAlert
                  });
                }
                else if (this.lang == 'sp'){
                  this.$vs.dialog({
                    color: this.colorAlert,
                    title: "Ocurrió un error",
                    accept: this.acceptAlert
                  });
                }
                else{
                  this.$vs.dialog({
                    color: this.colorAlert,
                    title: "An Error occured",
                    accept: this.acceptAlert
                  });
                }
                reject(err);
              });
          });
          alert("form submitted!");
        } else {
          // form have errors
        }
      });
    },

    put() {
      if (this.lang=='sp')
      {
        this.$vs.notify({
        title: 'Espere',
        text: 'Por favor espera un poco ...',
        color: 'primary',
        iconPack: 'feather',
        position: 'top-center',
        icon:'icon-clock'
      })
      }
      else if(this.lang=='de')
      {
        this.$vs.notify({
        title: 'Warten',
        text: 'Bitte warten Sie eine Weile ...',
        color: 'primary',
        iconPack: 'feather',
        position: 'top-center',
        icon:'icon-clock'
      })
      }
      else{
        this.$vs.notify({
        title: 'Wait',
        text: 'Please wait a little while...!',
        color: 'primary',
        iconPack: 'feather',
        position: 'top-center',
        icon:'icon-clock'
        })
      }
      let formData = new FormData();
      formData.append("file", this.fileo.doc);
      formData.append("language", this.fileo.language);
      console.log("form data is" + formData);
      var objidd = this.objid;
      var urll = "/uploads/add/?prdid=" + objidd;
      return new Promise((resolve, reject) => {
        axios
          .put(urll, formData)
          .then(resp => {
            this.colorAlert = "primary";
            if (this.lang == 'de'){
              this.$vs.dialog({
                color: this.colorAlert,
                title: "Archivo subido",
                text: "Wenn Sie weitere Dateien hinzufügen möchten, fügen Sie diese hinzu oder klicken Sie auf die Schaltfläche, um zur Download-Seite umzuleiten",
                accept: this.acceptAlert
              });
            }
            else if (this.lang == 'sp'){
              this.$vs.dialog({
                color: this.colorAlert,
                title: "Datei hochgeladen",
                text: "Si desea agregar más archivos, agregue o haga clic en el botón para redirigir a la página de descarga",
                accept: this.acceptAlert
              });
            }
            else{
              this.$vs.dialog({
                color: this.colorAlert,
                title: "File uploaded",
                text: "If you want to add further files please add or click button to redirect towards download page",
                accept: this.acceptAlert
              });
            }
            resolve(resp);
          })
          .catch(err => {
            this.colorAlert = "danger";
            if (this.lang == 'de'){
              this.$vs.dialog({
                color: this.colorAlert,
                title: "Ein Fehler ist aufgetreten",
                accept: this.acceptAlert
              });
            }
            else if (this.lang == 'sp'){
              this.$vs.dialog({
                color: this.colorAlert,
                title: "Ocurrió un error",
                accept: this.acceptAlert
              });
            }
            else{
              this.$vs.dialog({
                color: this.colorAlert,
                title: "An Error occured",
                accept: this.acceptAlert
              });
            }
            reject(err);
          });
      });
    }
  }
  
};
window.onbeforeunload = function() {
  return "Data will be lost if you leave the page, are you sure?";
};
</script>
