<template>
    <vs-row vs-justify="center">
    <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
    </vs-col>
    </vs-row><br><br>

    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="10">
        <vs-card>
        <div slot="header">
            <h3 v-if="this.lang == 'sp'">
            Agregar preguntas frecuentes
            </h3>
            <h3 v-if="this.lang == 'de'">
            FAQ hinzufügen
            </h3>
            <h3 v-if="this.lang != 'de' && this.lang != 'sp'">
            Add FAQ
            </h3>
        </div>
        <div v-if="this.lang == 'sp'" vs-justify="center">
            <vs-input
                name="question"
                icon-no-border
                icon="icon icon-user"
                icon-pack="feather"
                label-placeholder="Pregunta"
                v-model="faq.question"
                class="w-full"/>
            <br />
            <vs-textarea
                rows=7
                name="answer"
                height="200px" 
                icon-no-border
                icon="icon icon-user"
                icon-pack="feather"
                label="Responder"
                v-model="faq.answer"/>
            <br /><br /><br />
            <vs-button class="btnx" type="filled">{{select}}</vs-button>
            <vs-dropdown>
            <vs-button class="btn-drop" type="filled" icon="expand_more"></vs-button>
            <!-- <a href="#">Hola mundo</a> -->
            <vs-dropdown-menu>
                <vs-dropdown-item v-for="(cat,index) in categoriesGet">
                <span @click="faq.category=cat._id; select=cat.name">{{cat.name}}</span>
                </vs-dropdown-item>
            </vs-dropdown-menu>
            </vs-dropdown><br>
        </div>

        <div v-if="this.lang == 'de'" vs-justify="center">
            <vs-input
                name="question"
                icon-no-border
                icon="icon icon-user"
                icon-pack="feather"
                label-placeholder="Frage"
                v-model="faq.question"
                class="w-full"/>
            <br />
            <vs-textarea
                rows=7
                name="answer"
                height="200px" 
                icon-no-border
                icon="icon icon-user"
                icon-pack="feather"
                label="Antworten"
                v-model="faq.answer"/>
            <br /><br /><br />
            <vs-button class="btnx" type="filled">{{select}}</vs-button>
            <vs-dropdown>
            <vs-button class="btn-drop" type="filled" icon="expand_more"></vs-button>
            <!-- <a href="#">Hola mundo</a> -->
            <vs-dropdown-menu>
                <vs-dropdown-item v-for="(cat,index) in categoriesGet">
                <span @click="faq.category=cat._id; select=cat.name">{{cat.name}}</span>
                </vs-dropdown-item>
            </vs-dropdown-menu>
            </vs-dropdown><br>
        </div>

        <div v-if="this.lang != 'de' && this.lang != 'sp'" vs-justify="center">
            <vs-input
                name="question"
                icon-no-border
                icon="icon icon-user"
                icon-pack="feather"
                label-placeholder="Question"
                v-model="faq.question"
                class="w-full"/>
            <br />
            <vs-textarea
                rows=7
                name="answer"
                height="200px" 
                icon-no-border
                icon="icon icon-user"
                icon-pack="feather"
                label="Answer"
                v-model="faq.answer"/>
            <br /><br /><br />
            <vs-button class="btnx" type="filled">{{select}}</vs-button>
            <vs-dropdown>
            <vs-button class="btn-drop" type="filled" icon="expand_more"></vs-button>
            <!-- <a href="#">Hola mundo</a> -->
            <vs-dropdown-menu>
                <vs-dropdown-item v-for="(cat,index) in categoriesGet">
                <span @click="faq.category=cat._id; select=cat.name">{{cat.name}}</span>
                </vs-dropdown-item>
            </vs-dropdown-menu>
            </vs-dropdown><br>
        </div>
        <div v-if="this.lang == 'sp'" slot="footer">
            <vs-row vs-justify="center">
            <vs-button type="gradient" color="primary" icon="touch_app" @click="submit">Enviar</vs-button>
            <vs-button color="danger" icon="reply" @click="goBack">Regresa</vs-button>
            </vs-row>
        </div>
        <div v-if="this.lang == 'de'" slot="footer">
            <vs-row vs-justify="center">
            <vs-button type="gradient" color="primary" icon="touch_app" @click="submit">einreichen</vs-button>
            <vs-button color="danger" icon="reply" @click="goBack">Geh zurück</vs-button>
            </vs-row>
        </div>
        <div v-if="this.lang != 'de' && this.lang != 'sp'" slot="footer">
            <vs-row vs-justify="center">
            <vs-button type="gradient" color="primary" icon="touch_app" @click="submit">Submit</vs-button>
            <vs-button color="danger" icon="reply" @click="goBack">Go Back</vs-button>
            </vs-row>
        </div>
        </vs-card>
    </vs-col>
    </vs-row>
</template>

<script>
    import axios from 'axios';
    export default{
        data(){
            return {
                colorAlert:'primary',
                alertMessage:'',
                activeA:false,
                select:'Select Category',
                faq:{
                    category:'',
                    question:'',
                    answer:''
                },
                categoriesGet:[]
            }
        },
        computed: {
            lang() {
            this.graphComponent += 1
            return this.$i18n.locale
            }
        },
        methods: {
            getCategory(){
                return new Promise((resolve, reject) => {
                axios.get('/category/getCategory').then(resp => {
                this.categoriesGet=resp.data;
                resolve(resp)
                }).catch(err => {
                    console.log(err)
                    this.$router.push('/pages/login')
                    reject(err)
                })
            });

            },
            submit(){
                return new Promise((resolve, reject) => {
                    axios.post('/faq/addQuestion', this.faq).then(resp => {
                    if (this.lang == 'de'){
                        this.$vs.notify({
                            title: 'Erfolg',
                            text: 'FAQ erfolgreich hinzugefügt',
                            color: 'primary',
                            iconPack: 'feather',
                            position: 'top-center',
                            icon:'icon-check'
                        })
                    }
                    else if (this.lang == 'sp'){
                        this.$vs.notify({
                            title: 'Éxito',
                            text: 'FAQ agregado exitosamente',
                            color: 'primary',
                            iconPack: 'feather',
                            position: 'top-center',
                            icon:'icon-check'
                        })
                    }
                    else{
                        this.$vs.notify({
                            title: 'Success',
                            text: 'FAQ added succesfully',
                            color: 'primary',
                            iconPack: 'feather',
                            position: 'top-center',
                            icon:'icon-check'
                        })
                    }
                    resolve(resp)
                    }).catch(err => {
                        this.colorAlert='danger';
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
                        reject(err)
                    })
                });
            },
            goBack(){
                this.$router.push('/pages/faq')
            }
        },
        created() {
            this.getCategory()
        },
        components:{

        }
    }
</script>

<style lang="scss">
</style>