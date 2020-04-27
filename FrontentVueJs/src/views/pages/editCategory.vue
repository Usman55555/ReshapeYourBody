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
            Editar categoria
            </h3>
            <h3 v-if="this.lang == 'de'">
            Kategorie bearbeiten
            </h3>
            <h3 v-if="this.lang != 'de' && this.lang != 'sp'">
            Edit Category
            </h3>
        </div>
        <div v-if="this.lang == 'sp'" vs-justify="center">
            <vs-input
                name="question"
                icon-no-border
                icon="icon icon-user"
                icon-pack="feather"
                label-placeholder="nombre de la categoría"
                v-model="category.name"
                class="w-full"/>
            <br />
            <br />
        </div>
        
        <div v-if="this.lang == 'de'" vs-justify="center">
            <vs-input
                name="question"
                icon-no-border
                icon="icon icon-user"
                icon-pack="feather"
                label-placeholder="Kategoriename"
                v-model="category.name"
                class="w-full"/>
            <br />

            <br />
        </div>

        <div v-if="this.lang != 'de' && this.lang != 'sp'" vs-justify="center">
            <vs-input
                name="question"
                icon-no-border
                icon="icon icon-user"
                icon-pack="feather"
                label-placeholder="Category Name"
                v-model="category.name"
                class="w-full"/>
            <br />
            <br />
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
                category:{
                    name:''
                }
            }
        },
        methods: {
            submit(){
                this.category.categoryId=this.$route.params.id;
                return new Promise((resolve, reject) => {
                    axios.put('/category/updateCategory', this.category).then(resp => {
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
                            text: 'Category added succesfully',
                            color: 'primary',
                            iconPack: 'feather',
                            position: 'top-center',
                            icon:'icon-check'
                        })
                    }
                    resolve(resp)
                    }).catch(err => {
                        console.log(err)
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
        computed: {
            lang() {
            this.graphComponent += 1
            return this.$i18n.locale
            }
        },
        created() {
            return new Promise((resolve, reject) => {
                axios.get('/category/getCategoryById',{
                    params: {
                        CategoryId:this.$route.params.id
                    }
                }).then(resp => {
                    this.category.name=resp.data.name;
                    resolve(resp)
                }).catch(err => {
                    console.log(err);
                    reject(err)
                })
            });
        },
        components:{

        }
    }
</script>

<style lang="scss">
</style>